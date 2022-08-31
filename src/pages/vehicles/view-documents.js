import React from 'react'
import { ModalView } from '../../component';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ViewDocuments = ({ data: vehicle }) => {
    return (
        <ModalView title="Vehicle documents view" modalId="modal-vehicle-documents-view" cancelButtonText="Ok" size="xl">

            <div className="form-group">
                <label for="#" className='font-weight-bold'>Vehicle RC :</label>
                <div className='container list-group-item'>
                    {

                        vehicle?.rc_document == null ? "Documents not uploaded" :
                            <TransformWrapper>
                                <TransformComponent>
                                    <img src={vehicle?.rc_document} alt="id-proof" className='img-fluid' style={{ display: "block", margin: "auto" }} />
                                </TransformComponent>
                            </TransformWrapper>


                    }

                    <div className='d-flex justify-content-end mt-2'>
                        <a

                            href={vehicle?.rc_document} >
                            <button
                                type="button"
                                className="btn btn-primary "
                                disabled={vehicle?.rc_document ? false : true}
                                onClick={() => { }}
                            >
                                download
                            </button>
                        </a>

                    </div>
                </div>



            </div>

            <div className="form-group">
                <label for="#" className='font-weight-bold'>Vehicle Photo :</label>
                <div className='container list-group-item'>
                    {
                        vehicle?.vehicle_image == null ? "Documents not uploaded" :
                            <TransformWrapper >
                      
                                <TransformComponent>
                                    <img src={vehicle?.vehicle_image} alt="id-proof" className='img-fluid ' style={{ display: "block", margin: "auto" }} />
                                </TransformComponent>
                            </TransformWrapper>

                    }

                    <div className='d-flex justify-content-end mt-2'>
                        <a

                            href={vehicle?.vehicle_image} >
                            <button
                                type="button"
                                className="btn btn-primary "
                                disabled={vehicle?.vehicle_image ? false : true}
                                onClick={() => { }}
                            >
                                download
                            </button>
                        </a>

                    </div>
                </div>



            </div>

        </ModalView>
    )
}

export default ViewDocuments;