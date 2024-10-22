output "ecs_task_execution_role_arn" {
  description = "ECS task ARN"
  value       = aws_iam_role.ecs_task_execution_role.arn
}

output "ecs_service_role_arn" {
  description = "ECS service ARN"
  value       = aws_iam_role.ecs_service_role.arn
}