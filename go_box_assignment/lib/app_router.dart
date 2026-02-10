import 'package:go_box_assignment/features/presentations/error/error_page.dart';
import 'package:go_box_assignment/features/presentations/home_page/home_page.dart';
import 'package:go_box_assignment/features/presentations/login_page/login_page.dart';
import 'package:go_router/go_router.dart';

final GoRouter appRouter = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      name: 'home',
      builder: (context, state) => const HomePage(),
    ),
    GoRoute(
      path: '/login',
      name: 'login',
      builder: (context, state) => const LoginPage(),
    ),
  ],
  errorBuilder: (context, state) => const ErrorPage(),
);
