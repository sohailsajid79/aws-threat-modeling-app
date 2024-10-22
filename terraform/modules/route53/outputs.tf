output "certificate_arn" {
  description = "The ARN of the ACM certificate for the domain"
  value       = aws_acm_certificate.tm_certificate.arn
}

output "name_servers" {
  description = "Route 53 name servers for the hosted zone"
  value       = aws_route53_zone.zone.name_servers
}