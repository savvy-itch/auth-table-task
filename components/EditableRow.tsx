"use client"

import React, { useState } from 'react';
import { Person } from '@/app/globals';
import { useToast } from "@/components/ui/use-toast";

import { TableCell, TableRow } from "@/components/ui/table";
import { ImCross, ImCheckmark, ImPencil } from "react-icons/im";

const baseUrl = "https://technical-task-api.icapgroupgmbh.com/api/table";
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default function EditableRow({item}: {item: Person}) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>(item.name);
  const [email, setEmail] = useState<string>(item.email);
  const [bDate, setBDate] = useState<string>(item.birthday_date);
  const { toast } = useToast();

  function validateNewData() {
    // if no name entered
    if (name.length === 0) {
      toast({
        variant: "destructive",
        description: "Please enter valid name",
      });
      setName("");
    } else if (email.length === 0 || !emailPattern.test(email)) {
    // if no email added or invalid email added 
      toast({
        variant: "destructive",
        description: "Please enter valid email",
      });
      setEmail("");
    } else if (!datePattern.test(bDate)) {
    // if date is in incorrect format 
      toast({
        variant: "destructive",
        description: "Please enter birthday date in the form YYYY-MM-DD",
      });
      setBDate("");
    } else {
      updateItemData();
    }
  }

  async function updateItemData() {
    try {
      const newData: Person = {
        id: item.id,
        name: name,
        email: email,
        birthday_date: bDate,
        phone_number: item.phone_number,
        address: item.address
      }

      const response = await fetch(`${baseUrl}/${item.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newData)
      });

      if (response.status === 200) {
        toast({
          description: "Item updated successfully",
        });
        setIsEdit(false);
      } else {
        toast({
          variant: "destructive",
          description: "Update failed",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (isEdit) {
    return (
      <tr>
        <td className="flex justify-center items-center">
          <input 
            className="w-3/4 leading-8 p-1 rounded"
            type="text" value={name} onChange={(e) => setName(e.target.value)}
          />
        </td>
        <td>
          <input className="w-3/4 leading-8 p-1 rounded" 
            type="email" value={email} placeholder="example@mail.com" 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </td>
        <td className="flex justify-around items-center">
          <input 
            className="w-1/2 leading-8 p-1 rounded" 
            type="text" value={bDate} placeholder="YYYY-MM-DD"
            onChange={(e) => setBDate(e.target.value)} 
          />
          <button className="bg-white p-1 rounded" onClick={validateNewData}>
            <ImCheckmark />
          </button>
          <button className="bg-white p-1 rounded" onClick={() => setIsEdit(false)}>
            <ImCross />
          </button>
        </td>
      </tr>
    )
  }

  return (
    <TableRow key={item.id}>
      <TableCell className="font-medium">{item.name}</TableCell>
      <TableCell>{item.email}</TableCell>
      <TableCell className="flex justify-between">
        {item.birthday_date}
        <button className="text-xs p-1 rounded bg-white"
          onClick={() => setIsEdit(true)}
        >
          <ImPencil />
        </button>
      </TableCell>
    </TableRow>
  )
}