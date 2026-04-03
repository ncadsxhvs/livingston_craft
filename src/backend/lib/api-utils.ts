import { NextResponse } from "next/server";
import { ZodSchema } from "zod";
import { createClient } from "@backend/supabase/server";
import { AppError, UnauthorizedError, ValidationError } from "./errors";

type ApiHandler = (
  request: Request,
  context?: { user?: { id: string; email: string } }
) => Promise<NextResponse>;

export function apiHandler(handler: ApiHandler): ApiHandler {
  return async (request: Request, context?: { user?: { id: string; email: string } }) => {
    try {
      return await handler(request, context);
    } catch (error) {
      if (error instanceof AppError) {
        return NextResponse.json(
          {
            error: {
              code: error.code,
              message: error.message,
              ...(error instanceof ValidationError && {
                details: error.errors,
              }),
            },
          },
          { status: error.statusCode }
        );
      }

      console.error("Unhandled API error:", error);
      return NextResponse.json(
        {
          error: {
            code: "INTERNAL_ERROR",
            message: "An unexpected error occurred",
          },
        },
        { status: 500 }
      );
    }
  };
}

export function withAuth(handler: ApiHandler): ApiHandler {
  return apiHandler(async (request: Request) => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new UnauthorizedError();
    }

    return handler(request, {
      user: { id: user.id, email: user.email! },
    });
  });
}

export function withValidation<T>(
  schema: ZodSchema<T>,
  handler: (request: Request, data: T) => Promise<NextResponse>
): ApiHandler {
  return apiHandler(async (request: Request) => {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      const errors = result.error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));
      throw new ValidationError("Validation failed", errors);
    }

    return handler(request, result.data);
  });
}
