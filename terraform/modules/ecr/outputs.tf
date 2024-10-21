output "repository_url" {
  description = "ECR repository URL"
  value       = aws_ecr_repository.tm_app.repository_url
}