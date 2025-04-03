import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flight } from "@/types/flight";
import Image from "next/image";
// import { Route } from "@/types/route";
// import { Flight, Route } from "@/types"; // Adjust path as needed

interface FlightDetailsDialogProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedFlight: Flight | null;
  remarks: string;
  setRemarks: (remarks: string) => void;
  handleStatusChange: (id: string, status: number) => void;
}

const FlightDetailsDialog: React.FC<FlightDetailsDialogProps> = ({
  isModalOpen,
  setIsModalOpen,
  selectedFlight,
  remarks,
  setRemarks,
  handleStatusChange,
}) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Flight Details</h2>
          {selectedFlight && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-2">
                  <strong>Flight No:</strong> {selectedFlight.flightNumber}
                </div>
                <div className="mb-2">
                  <strong>Carrier:</strong> {selectedFlight.carrier?.fullName }
                </div>
                <div className="mb-2">
                  <strong>Departure:</strong> {selectedFlight.departureLocation}
                </div>
                <div className="mb-2">
                  <strong>Arrival:</strong> {selectedFlight.arrivalLocation}
                </div>
                <div className="mb-2">
                  <strong>Departure Date:</strong> {selectedFlight.departureDate ? new Date(selectedFlight.departureDate).toLocaleString() : 'N/A'}
                </div>
                <div className="mb-2">
                  <strong>Arrival Date:</strong> {selectedFlight.arrivalDate ? new Date(selectedFlight.arrivalDate).toLocaleString() : 'N/A'}
                </div>
                <div className="mb-2">
                  <strong>Available Weight:</strong> {selectedFlight.availableWeight} kg
                </div>
                <div className="mb-2">
                  <strong>Available Width:</strong> {selectedFlight.availableWidth} cm
                </div>
                <div className="mb-2">
                  <strong>Available Height:</strong> {selectedFlight.availableHeight} cm
                </div>
                <div className="mb-2">
                  <strong>Available Depth:</strong> {selectedFlight.availableDepth} cm
                </div>

                <div className="mb-2">
                  <strong>Passport Image:</strong>
                  {selectedFlight.passSportImg ? (
                                      <Image
                                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}profile/${selectedFlight.passSportImg}`}
                                        alt="Passport" 
                                        width={100}
                                        height={100}
                                      />
                                    ) : (
                                      "N/A"
                                    )
                                    }
                </div>
                <div className="mb-2">
                  <strong>Boarding Pass Image:</strong> 
                  {selectedFlight.boardingPassImg ? (
                                      <Image
                                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}profile/${selectedFlight.boardingPassImg}`}
                                        alt="boarding" 
                                        width={100}
                                        height={100}
                                      />
                                    ) : (
                                      "N/A"
                                    )
                                    }
                </div>
                {selectedFlight.route &&  (
                  <div className="col-span-2">
                    <strong className="block mb-2">Routes:</strong>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">  
                          <div><strong>Origin:</strong> {selectedFlight.route.originAirport}, {selectedFlight.route.originCountry}</div>
                          <div><strong>Destination:</strong> {selectedFlight.route.destinationAirport}, {selectedFlight.route.destinationCountry}</div>
                          <div><strong>Price/Kg:</strong> ${selectedFlight.route.pricePerKg}</div>
                           <div><strong>GST/Vat:</strong> {selectedFlight.route.gstPercent}%</div>
                          <div><strong>Additional Fees:</strong> ${selectedFlight.route.additionalFees}</div>
                   
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Remarks</label>
                <Input
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter remarks"
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleStatusChange(selectedFlight._id, 1)}>
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleStatusChange(selectedFlight._id, -1)}
                >
                  Reject
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlightDetailsDialog;