terraform {
  required_version = ">= 1.0"

  required_providers {
    supabase = {
      source  = "supabase/supabase"
      version = "~> 1.0"
    }
  }

  backend "s3" {
    bucket                      = "nenovi-tf-state"
    key                         = "furniture-platform/terraform.tfstate"
    region                      = "auto"
    endpoint                    = "https://806237f163cf060c86ca21293ad0d4da.r2.cloudflarestorage.com"
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    force_path_style            = true
  }
}

provider "supabase" {
  access_token = var.supabase_access_token
}

resource "supabase_project" "furniture_platform" {
  organization_id   = var.supabase_org_id
  name              = var.project_name
  database_password = var.database_password
  region            = var.region
}
