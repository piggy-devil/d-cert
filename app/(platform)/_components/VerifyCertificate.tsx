"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { verifyCert } from "@/actions/certificate";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { VerifyDialog } from "./VerifyDialog";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  file: z.instanceof(FileList).optional(),
});

type CertificateData = {
  [key: string]: any; // รองรับฟิลด์ที่ไม่แน่นอน
};

type CertState = {
  success?: string;
  certificate?: string;
  certificateData?: CertificateData;
};

export const VerifyCertificate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [certState, setCertState] = useState<CertState>({});
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const fileRef = form.register("file");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;

    if (!files) {
      console.error("Please select a file.");
      return;
    }

    if (files[0].type !== "application/json") {
      console.error("Invalid file type. Please upload a .json file.");
      return;
    }

    if (files && files.length > 0) {
      startTransition(async () => {
        const fileText = await files[0].text();
        try {
          const jsonContent = JSON.parse(fileText);
          const response = await verifyCert(jsonContent);

          if (response.success) {
            setCertState(response);
            setIsOpen(true);
            form.reset();
          }
        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className="max-w-md p-10">
          <FormField
            control={form.control}
            name="file"
            render={() => {
              return (
                <FormItem className="space-y-4">
                  <FormLabel className="flex justify-center text-primary">
                    {isPending ? (
                      <Loader2 className="animate-spin duration-500 text-slate-400" />
                    ) : (
                      "ตรวจสอบใบรับรองของท่าน"
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".json"
                      placeholder="shadcn"
                      {...fileRef}
                      onChange={handleFileChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {/* <Button type="submit">Submit</Button> */}
        </form>
      </Form>
      <div>
        <VerifyDialog open={isOpen} cert={certState} setOpen={setIsOpen} />
      </div>
    </div>
  );
};
