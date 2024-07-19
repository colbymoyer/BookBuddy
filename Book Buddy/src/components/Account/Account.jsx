import {
    useGetAccountQuery,
    useGetReservationsQuery,
    useDeleteReservationsMutation,
  } from "./AccountSlice";
  import { useEffect, useState } from "react";
  
  export default function Account() {
    const [account, getAccount] = useState([]);
    const { data, isSuccess } = useGetAccountQuery();
    const [reservations, getReservations] = useState([]);
    const { data: resData, isSuccess: resSuccess } = useGetReservationsQuery();
    const [deleteReservation, { isLoading: deleteLoading }] =
      useDeleteReservationsMutation();
    useEffect(() => {
      if (isSuccess && data) {
        const temp = JSON.parse(data);
        getAccount(temp);
      }
    }, [data, isSuccess]);
    useEffect(() => {
      if (resSuccess && resData) {
        const temp = JSON.parse(resData);
        getReservations(temp.reservation);
      }
    }, [resData, resSuccess]);
    async function returnBook(reservationId) {
      try {
        await deleteReservation(reservationId);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
    return (
      <>
        {isSuccess && (
          <div key={account.id}>
            <p>
              Name: {account.firstname} {account.lastname}
            </p>
            <p>Email: {account.email}</p>
            {resSuccess && (
              <ul>
                {reservations && reservations.length === 0 ? (
                  <p>You have no books currently checked out.</p>
                ) : (
                  reservations.map((reservation) => (
                    <li key={reservation.id}>
                      <p>Title: {reservation.title}</p>
                      <p>Author: {reservation.author}</p>
                      <button
                        onClick={() => returnBook(reservation.id)}
                        disabled={deleteLoading}
                      >
                        Return
                      </button>
                    </li>
                  )))}
              </ul>
            )}
          </div>
        )}
      </>
    );
  }