module "aws_ecr_repository" {
  source              = "./modules/ecr"
  ecr_repository_name = "aws-threat-modeling-app"
}

module "ecs" {
  source             = "./modules/ecs"
  cluster_name       = "this-cluster"
  task_family        = "this-task"
  task_cpu           = 256
  task_memory        = 512
  execution_role_arn = module.iam.ecs_task_execution_role_arn
  task_role_arn      = module.iam.ecs_task_execution_role_arn
  container_name     = "this-container"
  container_image    = module.aws_ecr_repository.repository_url
  ports              = 3000
  service_name       = "this-service"
  to_add             = 1
  subnet_ids         = module.vpc.public_subnet_ids
  security_group_ids = [module.securitygroup.sg_id]
  alb_target_group   = module.alb.target_group_arn
  http_listener_arn  = module.alb.http_listener
  https_listener_arn = module.alb.https_listener
}

module "iam" {
  source              = "./modules/iam"
  execution_role_name = "ecs_task_execution_role"
  service_role_name   = "ecs_service_role"
}

module "vpc" {
  source                  = "./modules/vpc"
  vpc_block               = "10.0.0.0/16"
  vpc_name                = "virtual-network"
  public_subnet_block     = ["10.0.1.0/24", "10.0.3.0/24"]
  availability_zone_block = ["eu-north-1a", "eu-north-1b"]
  rt_cidr                 = "0.0.0.0/0"
}

module "securitygroup" {
  source         = "./modules/securitygroup"
  security_group = "this-sg"
  vpc            = module.vpc.vpc_id
}

module "alb" {
  source            = "./modules/alb"
  alb_name          = "this-alb"
  security_group_id = module.securitygroup.sg_id
  subnet_ids        = module.vpc.public_subnet_ids
  target_group_name = "this-target-group"
  target_port       = 3000
  vpc_id            = module.vpc.vpc_id
  certificate_arn   = module.route53.certificate_arn
}

module "route53" {
  source            = "./modules/route53"
  zone_name         = "sohailsajid.dev"
  cname_record_name = "tm.sohailsajid.dev"
  alb_dns_name      = module.alb.alb_dns_name
  alb_zone_id       = module.alb.alb_zone_id
}


