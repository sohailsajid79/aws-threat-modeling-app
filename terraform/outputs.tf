output "ecr_repository_url" {
  description = "ECR repository URL"
  value       = module.aws_ecr_repository.repository_url
}

output "ecs_cluster_id" {
  description = "ECS Cluster ID"
  value       = module.ecs.ecs_cluster_id
}

output "ecs_service_arn" {
  description = "ECS Service ARN"
  value       = module.ecs.ecs_service_arn
}

output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "public_subnet_ids" {
  value = module.vpc.public_subnet_ids
}

output "name_servers" {
  description = "Route 53 name servers for hosted zone"
  value       = module.route53.name_servers
}

output "sg_id" {
  description = "Security group ID"
  value       = module.securitygroup.sg_id
}