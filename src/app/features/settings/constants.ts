export const MAX_AVATAR_SIZE = 10 * 1024 * 1024;

export const ALLOWED_AVATAR_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
]);

export const PROFILE_NAME_MAX_LENGTH = 50;
export const PROFILE_NAME_PATTERN = /^[a-zA-Z\s'-]+$/;
export const PROFILE_ROLE_PATTERN = /^[a-zA-Z0-9\s.,/&()+-]*$/;
export const SQL_COMMENT_PATTERN = /--|\/\*|\*\//;
export const RISKY_SQL_PATTERN =
  /(\b(select|insert|update|delete|drop|alter|create|truncate|union|exec|execute)\b|--|\/\*|\*\/|;|'|"|`)/i;
