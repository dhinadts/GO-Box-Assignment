import 'dart:io';
import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'package:http/http.dart' as http;

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _formKey = GlobalKey<FormState>();

  File? aadharFront;
  File? aadharBack;
  File? bankStatement;
  String? aadharFrontName;
  String? aadharBackName;
  String? bankStatementName;
  Future<void> pickImage(bool isFront) async {
    final result = await FilePicker.platform.pickFiles(type: FileType.image);

    if (result != null) {
      setState(() {
        if (isFront) {
          aadharFront = File(result.files.single.path!);
          aadharFrontName = result.files.single.name;
        } else {
          aadharBack = File(result.files.single.path!);
          aadharBackName = result.files.single.name;
        }
      });
    }
  }

  Future<void> pickPDF() async {
    final result = await FilePicker.platform.pickFiles(
      type: FileType.any, // ✅ IMPORTANT
      allowMultiple: false,
      withData: false,
    );

    if (result != null) {
      final file = result.files.single;

      // ✅ Manual validation (REQUIRED on Web)
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Please select a PDF file')),
        );
        return;
      }

      // Size check (10MB)
      final sizeMB = file.size / (1024 * 1024);
      if (sizeMB > 10) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('PDF must be under 10MB')));
        return;
      }

      setState(() {
        bankStatement = File(file.path!); // mobile
        bankStatementName = file.name;
      });
    }
  }

  Future<void> submitData() async {
    if (aadharFront == null || aadharBack == null || bankStatement == null) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('All files are required')));
      return;
    }

    final request = http.MultipartRequest(
      'POST',
      Uri.parse('http://EC2_PUBLIC_IP:5000/upload'),
    );

    request.headers['Authorization'] = 'Bearer YOUR_JWT_TOKEN';

    request.files.add(
      await http.MultipartFile.fromPath('image1', aadharFront!.path),
    );
    request.files.add(
      await http.MultipartFile.fromPath('image2', aadharBack!.path),
    );
    request.files.add(
      await http.MultipartFile.fromPath('pdf', bankStatement!.path),
    );

    final response = await request.send();

    if (response.statusCode == 201) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Uploaded successfully')));
    } else {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Upload failed')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('KYC Details')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              const Text(
                'User Details',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 10),
              Row(children: [const Text('Name: '), TextFormField()]),
              Row(children: [const Text('Phone Number: '), TextFormField()]),

              const Divider(height: 30),

              _uploadTile(
                title: 'Aadhar Card (Front)',
                file: aadharFront,
                onTap: () => pickImage(true),
              ),

              Text('Selected: ${aadharFrontName ?? 'None'}'),
              _uploadTile(
                title: 'Aadhar Card (Back)',
                file: aadharBack,
                onTap: () => pickImage(false),
              ),
              Text('Selected: ${aadharBackName ?? 'None'}'),
              _uploadTile(
                title: 'Bank Statement (PDF ≤ 10MB)',
                file: bankStatement,
                onTap: pickPDF,
              ),
              Text('Selected: ${bankStatementName ?? 'None'}'),

              const SizedBox(height: 20),

              ElevatedButton(
                onPressed: submitData,
                child: const Text('Submit'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _uploadTile({
    required String title,
    required File? file,
    required VoidCallback onTap,
  }) {
    return Card(
      child: ListTile(
        title: Text(title),
        subtitle: Text(file != null ? 'Selected' : 'No file selected'),
        trailing: ElevatedButton(onPressed: onTap, child: const Text('Upload')),
      ),
    );
  }
}
