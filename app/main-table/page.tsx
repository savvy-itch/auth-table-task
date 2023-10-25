"use client"

import React, { useEffect, useState } from 'react';
import { LIMIT } from '../globals';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../redux/store';
import { updateData } from '../redux/tableSlice';
import { Person } from '../globals';
import { logOut } from '../redux/authSlice';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Greeting from '@/components/Greeting';
import Pagination from '@/components/Pagination';
import EditableRow from '@/components/EditableRow';
import { Toaster } from "@/components/ui/toaster";
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const baseUrl = "https://technical-task-api.icapgroupgmbh.com/api/table/";

export default function MainTable() {
  const storeData = useAppSelector(state => state.tableReducer.dataOnPage); 
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<Person[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  function signOut() {
    dispatch(logOut());
    router.push("/");
    toast({
      description: "You've successfully logged out.",
    });
  }
  
  // initial data fetching
  useEffect(() => {
    function fetchData() {
      return fetch(`${baseUrl}?format=json&limit=${LIMIT}`)
        .then(response => response.json())
        .then(data => {
          setData(data.results);
          dispatch(updateData(data.results));
        })
        .catch(error => console.log(error));
    }
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setData(storeData);
  }, [storeData]);

  return (
    <main className="min-h-screen flex flex-col gap-4 justify-center items-center bg-orange-200">
      <Greeting />
      <Button onClick={signOut}>Log Out</Button>
      <Table className="w-full sm:w-1/2 mx-auto bg-zinc-400">
        <TableCaption>A list of all users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Birthday Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {storeData && (
            storeData.map((item: Person) => {
              return (
                <EditableRow key={item.id} item={item} />
              )
            })
          )}
        </TableBody>
      </Table>
      <Pagination />
      <Accordion type="single" collapsible className="w-full sm:w-1/2 px-3 bg-slate-200 rounded">
        <AccordionItem value="item-1">
          <AccordionTrigger>P.S.</AccordionTrigger>
          <AccordionContent>
            <p className="my-2">Thank you for checking out my take-home. I appreciate you giving me this oppotunity. I&#39;d like to explain briefly my thought process for this task because I thought you might be interested in how your potentional employee approaches tasks.</p>
            <p className="my-2">Since I was time restricted, I decided that for UI I&#39;ll use a component library to speed up the process and achieve the basic UX. I&#39;ve used Shadcn for several projects now and it proved to be easy to work with, looks good (as you can judge), modern, actively supported and unopinionated unlike other UI libs (Bootstrap namely).</p>
            <p className="my-2">Some of the difficulties I&#39;ve faced during development of this website were mostly related to setting app the tools for correct work with Next.js. Setting up Redux for Next.js was probably the hardest. Another slightly difficult challenge was pagination. It&#39;s never easy doing it.</p>
            <p className="my-2">Some of the things that could be improved had I more time on hands:
              <ul>
                <li>- More edge cases for editing table data and authentication.</li>
                <li>- Pagination could be improved by adding adjacent page numbers, e.g. current page is 2, then page 1 should be visible on the left and page 3 - on the right.</li>
                <li>- Storing user name and log in status in local storage to persist the data on page reloads.</li>
                <li>- Styling could definitely be improved if given more time to polish.</li>
                <li>- Search, filter, sorting functionality could be added as you mentioned in your instructions.</li>
              </ul>
            </p>
            <p className="my-2">Thank you again and hope to hear from you.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Toaster />
    </main>
  )
}