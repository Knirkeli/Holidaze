import { useState } from "react";
import { Button, buttonVariants } from "../../components/ui/button";
import Create from "./CreateVenue";
import Modal from "react-modal";
import { VenueData } from "../hooks/useBooking";

interface MyVenuesProps {
  venues: VenueData[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

export function MyVenues({ venues, handleEdit, handleDelete }: MyVenuesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="shadow-xl p-4 mt-6 mb-16 flex flex-col items-center justify-center">
      <h3 className="text-2xl font-bold mb-2">My Venues</h3>
      {venues.length > 0 ? (
        venues.map((venue) => (
          <div key={venue.id} className="mb-4">
            <h4 className="text-lg font-bold">{venue.name}</h4>
            {venue.media.length > 0 && (
              <img
                src={venue.media[0].url}
                alt={venue.media[0].alt}
                className="h-36 w-36 object-cover rounded mb-4"
              />
            )}
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => venue.id && handleEdit(venue.id.toString())}
            >
              Edit
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => venue.id && handleDelete(venue.id.toString())}
            >
              Delete
            </Button>
          </div>
        ))
      ) : (
        <p className="text-lg">No venues yet</p>
      )}
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Add a venue
      </Button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <Create closeModal={closeModal} />
      </Modal>
    </div>
  );
}
