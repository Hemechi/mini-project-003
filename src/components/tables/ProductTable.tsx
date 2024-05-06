"use client";
import LoadingComponent from "@/app/loading";
import { ProductType } from "@/lib/definitions";
import EditProductForm from "../forms/EditProductForm";
import Image from "next/image";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { IoEllipsisHorizontal } from "react-icons/io5";

const BASE_API_URL="https://store.istad.co/api/"
const customStyles = {
  rows: {
    style: {
      minHeight: "72px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
};

const url_based = "https://store.istad.co/api/products/";
const ProductTable = () => {
  const [getProduct, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openModal, setOpenModal] = useState(false);
  const [productDetail, setProductDetail] = useState({} as ProductType);
  const [productEdit, setProductEdit] = useState({} as ProductType);


  const handleDelete = async (productId:number) => {
    try {
      const response = await fetch(`${BASE_API_URL}products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NTA2NzEwLCJpYXQiOjE3MTIzNDY3MTAsImp0aSI6ImI1MGRjMDdkZWE3NTRjMTNiYmVjNWMzOWFmMmExY2NiIiwidXNlcl9pZCI6MzR9.v7FTGPeL5cFWUMg0PfxKfpD6yFjHzfin8CveD-Sn-A0',
          'Cookie': 'csrftoken=your_csrf_token_here; sessionid=your_session_id_here', 
        },
      });
      const data = await response.json();
      console.log('Deleted product:', data);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  function handleDetail(value: ProductType) {
    onOpen();
    setProductDetail(value);
  }
 function handleEdit(row: ProductType) { // Explicitly type the parameter
    setOpenModal(true);
    setProductEdit(row);
  }
  const columnsData: TableColumn<ProductType>[] = [
    {
      name: "ID",
      selector: (row): any => (
        <div className=" font-bold text-base-color-red">{row.id}</div>
      ),
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => (
        <p>${row.price}</p>
      ),
      sortable: true,
    },
    {
      name: "Image",
      selector: (row): any => (
        <Image src={row.image || ""} width={70} height={70} alt="products" />
      ),
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <div>
            <Dropdown>
              <DropdownTrigger>
                <button className="rounded-none">
                  <IoEllipsisHorizontal />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="detail" onClick={() => handleDetail(row)}>
                  View Detail
                </DropdownItem>
                <DropdownItem key="edit" onClick={() => handleEdit(row)}>
                  Edit
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={() => row.id && handleDelete(row.id)}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    async function fetchData() {
      const data = await fetch(url_based);
      const response = await data.json();
      setProduct(response.results);
      setFilter(response.results);
    }
    fetchData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!search) {
      setFilter(getProduct);
      return;
    }
    const result = getProduct.filter((item: ProductType) => {
      return item.name?.toLowerCase().includes(search.toLowerCase());
    });
    setFilter(result);
  }, [getProduct, search]);

  return (
    <div className="w-full">
      <div className="w-full flex justify-center py-2">
        <h1 className="text-xl font-bold">Products Data</h1>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-base-color-red">
                Product View Detail
              </ModalHeader>
              <ModalBody>
                <p>{productDetail.name}</p>
                <p>${productDetail.price}</p>
                <span className="bg-base-color-red text-base-color-white w-40 text-sm font-medium me-2 mb-3 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 text-center">{productDetail.category}</span>
                <Image
                  src={productDetail.image || ""}
                  width={100}
                  height={100}
                  alt="products" 
                  className="mb-3"
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalContent>
          <ModalBody>
          <EditProductForm
              pro={productEdit} // Pass product details to the EditProductForm
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <DataTable
        progressPending={isLoading}
        columns={columnsData}
        fixedHeader={true}
        fixedHeaderScrollHeight="500px"
        selectableRows
        pagination
        subHeader
        subHeaderComponent={
          <input
            className="border-[1px] px-4 py-2 mt-3 container mx-auto rounded-md border-base-color-green"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        }
        progressComponent={<LoadingComponent />}
        customStyles={customStyles}
        data={filter}
      />
    </div>
  );
};

export default ProductTable;
