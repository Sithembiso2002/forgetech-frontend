import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private config: ConfigService) {
    this.supabase = createClient(
      config.get<string>('SUPABASE_URL')!,
      config.get<string>('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } }
    );
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  async verifyToken(token: string) {
    const { data, error } = await this.supabase.auth.getUser(token);
    if (error) throw new Error('Invalid token');
    return data.user;
  }

  async uploadFile(bucket: string, path: string, fileBuffer: Buffer, mimeType: string): Promise<{ path: string }> {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, fileBuffer, { contentType: mimeType });
    if (error) throw error;
    return data;
  }

  getPublicUrl(bucket: string, path: string): string {
    return this.supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  }
}