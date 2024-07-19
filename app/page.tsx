"use client";
import { HaitianDiasporaConnect } from "@/components/haitian-diaspora-connect";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <>
      <HaitianDiasporaConnect />
      <ToastContainer />
    </>
  );
}
