output "ecs_cluster_id" {
  description = "ECS Cluster ID"
  value       = aws_ecs_cluster.cluster.id
}

output "ecs_service_arn" {
  description = "ECS Service ARN"
  value       = aws_ecs_service.service.id
}