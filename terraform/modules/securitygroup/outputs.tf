output "sg_id" {
  description = "Security group ID"
  value       = aws_security_group.ecs_sg.id
}