output "alb_arn" {
  description = "ALB ARN (Amazon Resource Name)"
  value       = aws_lb.alb.arn
}

output "alb_dns_name" {
  description = "ALB DNS name"
  value       = aws_lb.alb.dns_name
}

output "alb_zone_id" {
  description = "ALB Zone ID"
  value       = aws_lb.alb.zone_id
}

output "target_group_arn" {
  description = "Target group ARN"
  value       = aws_lb_target_group.target_group.arn
}

output "http_listener" {
  description = "HTTP listener ID"
  value       = aws_lb_listener.http_listener.id
}

output "https_listener" {
  description = "HTTPS listener ID"
  value       = aws_lb_listener.https_listener.id
}