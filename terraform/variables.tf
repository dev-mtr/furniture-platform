variable "supabase_access_token" {
  description = "Supabase personal access token (from supabase.com/dashboard/account/tokens)"
  type        = string
  sensitive   = true
}

variable "supabase_org_id" {
  description = "Supabase organization ID (visible in dashboard URL)"
  type        = string
}

variable "project_name" {
  description = "Name for the Supabase project"
  type        = string
  default     = "furniture-platform"
}

variable "database_password" {
  description = "Password for the Supabase Postgres database"
  type        = string
  sensitive   = true
}

variable "region" {
  description = "Supabase project region"
  type        = string
  default     = "eu-central-1"
}
