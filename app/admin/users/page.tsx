"use client";

import { useEffect, useState } from "react";
import {
    getAdminUsers,
    createAdminUser,
    updateAdminUser,
    deleteAdminUser,
} from "@/lib/iirc-api";
import {
    Plus,
    Edit,
    Trash2,
    Users,
} from "lucide-react";


type UserRow = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    company_name: string | null;
    position: string | null;
    role_id: number;
    is_active: number;
    created_at: string;
};



const defaultForm = {

    name: "",
    email: "",
    password: "",
    phone: "",
    company_name: "",
    position: "",
    role_id: 2,
    is_active: 1

};



export default function AdminUsersPage() {


    const [users, setUsers] = useState<UserRow[]>([]);

    const [form, setForm] = useState(defaultForm);

    const [editId, setEditId] = useState<number | null>(null);

    const [loading, setLoading] = useState(false);



    const token =
        typeof window !== "undefined"
            ?
            localStorage.getItem("apiToken") ?? ""
            :
            "";





    async function loadUsers() {

        try {

            const data =
                await getAdminUsers(token);

            setUsers(data);


        } catch {

            setUsers([]);

        }

    }




    useEffect(() => {

        loadUsers();

    }, []);





    function changeForm(
        key: string,
        value: any
    ) {

        setForm({

            ...form,

            [key]: value

        });

    }






    async function saveUser() {


        try {


            if (editId) {

                await updateAdminUser(
                    token,
                    editId,
                    form
                );


            } else {


                await createAdminUser(
                    token,
                    form
                );


            }



            setForm(defaultForm);

            setEditId(null);


            loadUsers();



        } catch (error) {

            alert("Failed save user");

        }



    }







    function editUser(user: UserRow) {


        setEditId(user.id);


        setForm({

            name: user.name,

            email: user.email,

            password: "",

            phone: user.phone ?? "",

            company_name: user.company_name ?? "",

            position: user.position ?? "",

            role_id: user.role_id,

            is_active: user.is_active

        });


    }






    async function removeUser(id: number) {


        const confirmDelete =
            confirm(
                "Delete user ini?"
            );


        if (!confirmDelete)
            return;



        await deleteAdminUser(
            token,
            id
        );


        loadUsers();


    }






    return (

        <div className="space-y-6">



            <div className="flex justify-between items-center">


                <div>

                    <h1 className="text-2xl font-bold">
                        User Management
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        SUPER ADMIN ONLY
                    </p>

                </div>



                <div className="flex items-center gap-2">

                    <Users size={20} />

                    <span>
                        {users.length} Users
                    </span>

                </div>


            </div>






            <div className="rounded-xl border p-5 space-y-4">


                <h2 className="font-semibold">

                    {
                        editId
                            ?
                            "Edit User"
                            :
                            "Tambah User"
                    }

                </h2>



                <div className="grid grid-cols-2 gap-3">



                    <input

                        className="border rounded-lg p-2"

                        placeholder="Name"

                        value={form.name}

                        onChange={
                            e => changeForm(
                                "name",
                                e.target.value
                            )
                        }

                    />




                    <input

                        className="border rounded-lg p-2"

                        placeholder="Email"

                        value={form.email}

                        onChange={
                            e => changeForm(
                                "email",
                                e.target.value
                            )
                        }

                    />




                    <input

                        className="border rounded-lg p-2"

                        placeholder="Password"

                        type="password"

                        value={form.password}

                        onChange={
                            e => changeForm(
                                "password",
                                e.target.value
                            )
                        }

                    />




                    <input

                        className="border rounded-lg p-2"

                        placeholder="Phone"

                        value={form.phone}

                        onChange={
                            e => changeForm(
                                "phone",
                                e.target.value
                            )
                        }

                    />




                    <input

                        className="border rounded-lg p-2"

                        placeholder="Company"

                        value={form.company_name}

                        onChange={
                            e => changeForm(
                                "company_name",
                                e.target.value
                            )
                        }

                    />




                    <select

                        className="border rounded-lg p-2"

                        value={form.role_id}

                        onChange={
                            e => changeForm(
                                "role_id",
                                Number(e.target.value)
                            )
                        }

                    >


                        <option value={1}>
                            SUPER ADMIN
                        </option>


                        <option value={2}>
                            ADMIN
                        </option>


                        <option value={3}>
                            FINANCE ADMIN
                        </option>


                    </select>



                </div>





                <button

                    onClick={saveUser}

                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg"

                >


                    {
                        editId
                            ?
                            <Edit size={16} />
                            :
                            <Plus size={16} />
                    }


                    {
                        editId
                            ?
                            "Update"
                            :
                            "Tambah"
                    }


                </button>


            </div>







            <div className="rounded-xl border overflow-hidden">


                <table className="w-full text-sm">


                    <thead>

                        <tr className="border-b bg-muted/30">


                            <th className="p-4 text-left">
                                Nama
                            </th>


                            <th className="p-4 text-left">
                                Email
                            </th>


                            <th className="p-4">
                                Role
                            </th>


                            <th className="p-4">
                                Status
                            </th>


                            <th className="p-4">
                                Action
                            </th>


                        </tr>


                    </thead>





                    <tbody>


                        {
                            users.map(user => (


                                <tr
                                    key={user.id}
                                    className="border-b"
                                >


                                    <td className="p-4">

                                        <div className="font-medium">

                                            {user.name}

                                        </div>

                                        <div className="text-xs text-muted-foreground">

                                            {user.company_name ?? "-"}

                                        </div>

                                    </td>





                                    <td className="p-4">

                                        {user.email}

                                    </td>






                                    <td className="p-4 text-center">


                                        {
                                            user.role_id === 1
                                                ?
                                                "SUPER ADMIN"
                                                :
                                                user.role_id === 3
                                                    ?
                                                    "FINANCE ADMIN"
                                                    :
                                                    "ADMIN"
                                        }


                                    </td>







                                    <td className="p-4 text-center">


                                        {
                                            user.is_active === 1
                                                ?
                                                "Aktif"
                                                :
                                                "Nonaktif"
                                        }


                                    </td>








                                    <td className="p-4">


                                        <div className="flex justify-center gap-2">


                                            <button

                                                onClick={() => editUser(user)}

                                                className="border rounded p-2"

                                            >

                                                <Edit size={15} />

                                            </button>





                                            <button

                                                onClick={() => removeUser(user.id)}

                                                className="border rounded p-2 text-red-500"

                                            >

                                                <Trash2 size={15} />

                                            </button>


                                        </div>


                                    </td>





                                </tr>


                            ))
                        }



                    </tbody>



                </table>



            </div>



        </div>


    );


}