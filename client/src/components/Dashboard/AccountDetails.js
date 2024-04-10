/* eslint-disable no-unused-vars */
import { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { accountContext } from "../context/AccountContext/AccountContext";
import AllTransactions from "./AllTransactions";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function AccountDetails() {
  const { getAccountDetailsAction, account, error } =
    useContext(accountContext);
  const { accountID } = useParams();

  useEffect(() => {
    getAccountDetailsAction(accountID);
  }, [accountID, getAccountDetailsAction]);

  //Calculate total income
  const totalIncome = account?.data?.transactions?.reduce(
    (acc, transaction) => {
      if (transaction?.transactionType === "Income") {
        return acc + transaction?.amount;
      } else {
        return acc;
      }
    },
    0
  );

  //Calculate total expenses
  const totalExpenses = account?.data?.transactions?.reduce(
    (acc, transaction) => {
      if (transaction?.transactionType === "Expenses") {
        return acc + transaction?.amount;
      } else {
        return acc;
      }
    },
    0
  );
  return (
    <>
      {account?.data?.transactions.length <= 0 ? (
        <>
          <h2 className="text-center text-red-500 m-10">
            This account don't have any transactions
          </h2>
          <div className="text-center">
            <Link
              to={`/add-transaction/${accountID}`}
              className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              <span>New Transaction</span>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="bg-gray-50 pt-12 sm:pt-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {account?.data?.name}
                </h2>
                <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                  A list of your account transactions.
                </p>
              </div>
            </div>
            <div className="mt-10 bg-white pb-12 sm:pb-16">
              <div className="relative">
                <div className="absolute inset-0 h-1/2 bg-gray-50" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="mx-auto max-w-4xl">
                    <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                      <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                        <dt className=" mt-2 text-lg font-medium leading-6 text-gray-500">
                          Total Balance
                        </dt>
                        <dd className=" text-5xl font-bold tracking-tight text-indigo-600">
                          $
                          {totalIncome +
                            account?.data?.initialBalance -
                            totalExpenses}
                        </dd>
                      </div>
                      <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                        <dt className=" mt-2 text-lg font-medium leading-6 text-gray-500">
                          Total Expenses
                        </dt>
                        <dd className=" text-5xl font-bold tracking-tight text-red-600">
                          ${totalExpenses}
                        </dd>
                      </div>
                      <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                        <dt className=" mt-2 text-lg font-medium leading-6 text-gray-500">
                          Total Income
                        </dt>
                        <dd className=" text-5xl font-bold tracking-tight text-green-600">
                          ${totalIncome + account?.data?.initialBalance}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AllTransactions
            transactions={account?.data?.transactions}
            accountID={accountID}
          />
        </>
      )}
    </>
  );
}
