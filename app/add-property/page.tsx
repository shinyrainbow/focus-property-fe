"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Upload, ArrowLeft } from "lucide-react";

import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import {
  propertyFormSchema,
  type PropertyFormData,
} from "@/lib/validations/property";
import Link from "next/link";
import { useSession } from "next-auth/react";

const bangkokDistricts = [
  "Sukhumvit",
  "Silom",
  "Sathorn",
  "Asoke",
  "Thonglor",
  "Phrom Phong",
  "Ari",
  "Phaya Thai",
  "Ratchathewi",
  "Chatuchak",
  "Huai Khwang",
  "Din Daeng",
  "Dusit",
  "Phra Nakhon",
  "Samphanthawong",
  "Bang Rak",
];

const propertyTypes = [
  "Condo",
  "Studio",
  "Penthouse",
  "Suite",
  "Duplex",
  "Loft",
];

export default function AddPropertyPage() {
  const { data: session, status } = useSession();
  const { t } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: "Trendy test naja nana",
      description:
        "hello this is good confo hello this is good confo hello this is good confo hello this is good confo hello this is good confo hello this is good confo",
      listingType: "rent",
      price: "20000",
      location: "nana jaaaaa",
      propertyType: "Condo",
      bedrooms: "1",
      bathrooms: "1",
      area: "45",
      floor: "5",
      amenities: "",
      contact: "1234567890",
    },
  });

  useEffect(() => {
    if (status !== "loading" && !session?.user) {
      router.push("/auth/signin");
    }
  }, [status?.user, status, router]);

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const onSubmit = async (data: PropertyFormData) => {
    // e.preventDefault();
    if (!files) return;

    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]); // 'files' is the key your API expects
    }

    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      // console.log(data.status, 77777);
      setUploading(false);
      toast({
        title: "Success",
        description: t("add.property.success"),
      });

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setUploading(false);
      toast({
        title: "Error",
        description: t("add.property.error"),
        variant: "destructive",
      });
    }
    // try {
    //   // Here you would typically send the data to your API
    //   console.log("Form data:::::", data);

    //   // Simulate API call
    //   // await new Promise((resolve) => setTimeout(resolve, 2000));

    //   toast({
    //     title: "Success",
    //     description: t("add.property.success"),
    //   });

    //   router.push("/dashboard");
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: t("add.property.error"),
    //     variant: "destructive",
    //   });
    // }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />

      <div
        className={`${
          session?.user ? "ml-64" : ""
        } transition-all duration-300`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="mr-4 bg-transparent"
            >
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {t("add.property.title")}
              </h1>
              <p className="text-gray-600 mt-2">{t("add.property.subtitle")}</p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Basic Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {t("add.property.basic.info")}xxxxxxx
                      </CardTitle>
                      <CardDescription>
                        {t("add.property.basic.desc")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("form.title")}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t("form.title.placeholder")}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("form.description")}</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t("form.description.placeholder")}
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Listing Type */}
                      <FormField
                        control={form.control}
                        name="listingType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("form.listing.type")}</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col sm:flex-row gap-4 mt-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="rent" id="rent" />
                                  <Label htmlFor="rent">
                                    {t("form.for.rent")}
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="sale" id="sale" />
                                  <Label htmlFor="sale">
                                    {t("form.for.sale")}
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("form.price")}</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder={
                                    form.watch("listingType") === "rent"
                                      ? t("form.price.rent.placeholder")
                                      : t("form.price.sale.placeholder")
                                  }
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("form.location")}</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={t(
                                        "form.location.placeholder"
                                      )}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {bangkokDistricts.map((district) => (
                                    <SelectItem key={district} value={district}>
                                      {district}, Bangkok
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Property Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("add.property.details")}</CardTitle>
                      <CardDescription>
                        {t("add.property.details.desc")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <FormField
                          control={form.control}
                          name="propertyType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("form.property.type")}</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {propertyTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="bedrooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("form.bedrooms")}</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="2"
                                  min="0"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="bathrooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("form.bathrooms")}</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="2"
                                  min="1"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="area"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("form.area")}</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="85"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="floor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("form.floor")}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t("form.floor.placeholder")}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="amenities"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("form.amenities")}</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t("form.amenities.placeholder")}
                                rows={3}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Contact Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("add.property.contact")}</CardTitle>
                      <CardDescription>
                        {t("add.property.contact.desc")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="contact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("form.contact.details")}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t("form.contact.placeholder")}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Property Images */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("add.property.images")}</CardTitle>
                      <CardDescription>
                        {t("add.property.images.desc")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          {t("form.upload.images")}
                        </p>
                        <p className="text-sm text-gray-500">
                          {t("form.upload.desc")}
                        </p>
                        {/* <Button variant="outline" className="mt-4 bg-transparent" type="button">
                          {t("form.choose.files")}
                        </Button> */}
                        <input
                          className="mt-4 bg-transparent"
                          type="button"
                          type="file"
                          multiple
                          onChange={handleFileChange}
                        />
                        xxxxxx
                      </div>
                    </CardContent>
                  </Card>

                  {/* Publishing */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Publishing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting
                          ? "Publishing..."
                          : t("add.property.publish")}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        {t("add.property.save.draft")}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
