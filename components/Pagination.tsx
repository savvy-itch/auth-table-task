"use client"

import React, { useEffect, useState } from 'react';
import { AppDispatch, useAppSelector } from '@/app/redux/store';
import { LIMIT } from '@/app/globals';
import { useDispatch } from 'react-redux';
import { updatePage, updateData } from '@/app/redux/tableSlice';

const baseUrl = "https://technical-task-api.icapgroupgmbh.com/api/table/";

export default function Pagination() {
  const [isLastPage, setIsLastPage] = useState<boolean>(true);
  const currPage = useAppSelector(state => state.tableReducer.currPage);
  const dispatch = useDispatch<AppDispatch>();

  // https://technical-task-api.icapgroupgmbh.com/api/table/?limit=10&offset=10

  function fetchNewData(offset: number) {
    return fetch(`${baseUrl}?format=json&limit=${LIMIT}&offset=${offset}`)
      .then(response => response.json())
      .then(data => {
        dispatch(updateData(data.results));
      })
      .catch(error => console.log(error));
  }

  async function checkLastPage() {
    try {
      const response = await fetch(`${baseUrl}?format=json&limit=${LIMIT}&offset=${(currPage + 1) * 10}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  function prevPage() {
    const newPage: number = currPage - 1;
    const offset: number = newPage * 10;
    dispatch(updatePage(newPage));
    fetchNewData(offset);
  }

  async function nextPage() {
    const dataForNextPage = await checkLastPage();
    // if no data left, disable "Next" button
    if (dataForNextPage.length === 0) {
      setIsLastPage(true);
    } else {
      const newPage = currPage + 1;
      const offset: number = newPage * 10;
      dispatch(updatePage(newPage));
      fetchNewData(offset);
    }
  }

  // check if there's more data left for the next page
  useEffect(() => {
    async function fetchDataForNextPage() {
      const dataForNextPage = await checkLastPage();
      if (dataForNextPage.length === 0) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
    }
    fetchDataForNextPage();
  }, [currPage])

  return (
    <div className="flex gap-2">
      <button 
        className={`bg-white p-2 rounded ${currPage === 1 ? 'text-gray-400' : ''}`} 
        disabled={currPage === 1}
        onClick={prevPage}
      >
        Previous
      </button>
      <button className="bg-white p-2 rounded">{currPage}</button>
      <button 
        className={`bg-white p-2 rounded ${isLastPage ? 'text-gray-400' : ''}`}
        disabled={isLastPage}
        onClick={nextPage}
      >
        Next
      </button>
    </div>
  )
}