'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getUsers, deleteUser } from '../apiCalls';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FILTER_TYPE } from '@/constants/constsnt';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const UsersPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Get status from URL or default to 'all'
  const currentStatus = searchParams.get('status') || 'all';

  const fetchUsers = async (status, page = 1) => {
    try {
      const response = await getUsers({ status, page, limit: 10 });
      if (response) {
        setUsers(response.users || []);
        setTotalPages(response.totalPages || 1);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    setCurrentPage(page);
    fetchUsers(currentStatus, page);
  }, [currentStatus, searchParams]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage);
    if (currentStatus !== 'all') {
      params.set('status', currentStatus);
    }
    router.push(`/user/all?${params.toString()}`);
  };

  const handleFilterChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', 1); // Reset to first page on filter change

    if (value === 'all') {
      params.delete('status');
    } else {
      params.set('status', value);
    }

    router.push(`/user/all?${params.toString()}`);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      await fetchUsers(currentStatus);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Users ({users?.length || 0})</h1>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/user/create">Add New User</Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <Select
          defaultValue={currentStatus}
          value={currentStatus}
          onValueChange={handleFilterChange}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {Object.entries(FILTER_TYPE).map(([key, value]) => (
              <SelectItem key={value} value={value}>
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium 
                        ${user.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : user.status === 'INACTIVE'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex justify-end gap-2">
                        {user.status.toLowerCase() !== 'deactivated' && (
                          <>
                            <Button asChild>
                              <Link href={`/user/create?id=${user.id}`}>
                                Edit
                              </Link>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive">Delete</Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete User</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this user? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(user.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                        {user.status.toLowerCase() === 'deactivated' && (
                          <span className="text-sm text-gray-500 italic">
                            No actions available
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="py-3 px-4 sm:px-6">
          <Pagination>
            <PaginationContent className="flex-wrap justify-center gap-2">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                />
              </PaginationItem>

              <PaginationItem className="hidden sm:block">
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
              </PaginationItem>

              {currentPage === totalPages ? null : <PaginationItem><PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
              </PaginationItem>
              }
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;