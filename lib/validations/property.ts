import { z } from "zod"

export const propertyFormSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(1000, "Description must be less than 1000 characters"),
  listingType: z.enum(["rent", "sale"], {
    required_error: "Please select a listing type",
  }),
  price: z
    .string()
    .min(1, "Price is required")
    .transform((val) => Number.parseInt(val, 10)),
  location: z.string().min(1, "Location is required"),
  propertyType: z.string().min(1, "Property type is required"),
  bedrooms: z
    .string()
    .min(1, "Number of bedrooms is required")
    .transform((val) => Number.parseInt(val, 10)),
  bathrooms: z
    .string()
    .min(1, "Number of bathrooms is required")
    .transform((val) => Number.parseInt(val, 10)),
  area: z
    .string()
    .min(1, "Area is required")
    .transform((val) => Number.parseInt(val, 10)),
  floor: z.string().optional(),
  amenities: z.string().optional(),
  contact: z.string().min(10, "Contact information is required").max(50, "Contact must be less than 50 characters"),
})

export type PropertyFormData = z.infer<typeof propertyFormSchema>
