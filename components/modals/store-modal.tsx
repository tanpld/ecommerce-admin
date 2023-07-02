"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "@/components/ui/modal";

interface StoreModalProps {}

export default function StoreModal(props: StoreModalProps) {
  const { isOpen, onOpen, onClose } = useStoreModal();

  return (
    <Modal
      title={"Create Store"}
      description={"Add a new store to manage products and categories"}
      isOpen={isOpen}
      onClose={onClose}
    ></Modal>
  );
}
