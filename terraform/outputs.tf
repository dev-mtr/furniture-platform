data "supabase_apikeys" "furniture_platform" {
  project_ref = supabase_project.furniture_platform.id
}

output "project_id" {
  description = "Supabase project ID"
  value       = supabase_project.furniture_platform.id
}

output "project_url" {
  description = "Supabase project API URL"
  value       = "https://${supabase_project.furniture_platform.id}.supabase.co"
}

output "database_url" {
  description = "Direct Postgres connection string (use in Prisma / server .env)"
  value       = "postgresql://postgres:${var.database_password}@db.${supabase_project.furniture_platform.id}.supabase.co:5432/postgres"
  sensitive   = true
}

output "anon_key" {
  description = "Supabase anon/public key (safe for frontend)"
  value       = data.supabase_apikeys.furniture_platform.anon_key
  sensitive   = true
}

output "service_role_key" {
  description = "Supabase service role key (server-side only, never expose to frontend)"
  value       = data.supabase_apikeys.furniture_platform.service_role_key
  sensitive   = true
}
