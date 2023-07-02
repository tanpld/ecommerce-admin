"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1),
});

interface StoreModalProps {}

export default function StoreModal(props: StoreModalProps) {
  const { isOpen, onOpen, onClose } = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.post("/api/stores", values);
      toast.success("Store created!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={"Create Store"}
      description={"Add a new store to manage products and categories"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onClose()}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
