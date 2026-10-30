// apps/backend/src/supabase/supabase.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private supabase: SupabaseClient;

  constructor(private config: ConfigService) {
    const url = config.get<string>('SUPABASE_URL');
    const key = config.get<string>('SUPABASE_SERVICE_ROLE_KEY');

    if (!url || !key) {
      throw new Error(
        'SupabaseService: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set',
      );
    }

    if (!key.startsWith('eyJ')) {
      this.logger.warn(
        'SUPABASE_SERVICE_ROLE_KEY does not look like a JWT — did you paste the anon key by mistake?',
      );
    }

    this.supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  async verifyToken(token: string) {
    const { data, error } = await this.supabase.auth.getUser(token);
    if (error) throw new Error('Invalid token');
    return data.user;
  }

  async uploadFile(
    bucket: string,
    path: string,
    fileBuffer: Buffer,
    mimeType: string,
  ): Promise<{ path: string }> {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, fileBuffer, {
        contentType: mimeType,
        upsert: false,
      });
    if (error) {
      this.logger.error(
        `Upload failed for ${bucket}/${path}: ${error.message}`,
      );
      throw new Error(`Upload failed: ${error.message}`);
    }
    return data;
  }

  getPublicUrl(bucket: string, path: string): string {
    return this.supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  }
}