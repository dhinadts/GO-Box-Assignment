class User {
  final String? id;
  final String? name;
  final String? email;
  final String? avatarUrl;
  const User({this.id, this.name, this.email, this.avatarUrl});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      avatarUrl: json['avatarUrl'],
    );
  }

  Map<String, dynamic> toJson() {
    return {'id': id, 'name': name, 'email': email, 'avatarUrl': avatarUrl};
  }
}
