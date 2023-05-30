import react from 'react';
import { Modal} from 'react-bootstrap'
import ProfileForm from '../forms/ProfileForm';
import QualificationForm from '../forms/QualificationForm';
import EmploymentForm from '../forms/EmploymentForm';
import OtherEmploymentForm from '../forms/OtherEmploymentForm';
import PreviousEmploymentForm from '../forms/PreviousEmploymentForm';
import OtherQualificationForm from '../forms/OtherQualificationForm'

import ObjectToArray from '../../utils/ObjectToArray';

export default function Popup({lgShow, setLgShow, data}) {
    return (
      <>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              User Data
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProfileForm setData={null} data={data.profile} disabled={true}/>
            {ObjectToArray(data.otherQualificationData).map((item, i) => {
              return <OtherQualificationForm setData={null} data={item} disabled={true} key={i} />
            })}
            <QualificationForm setData={null} data={data.qualification} disabled={true} />
            <EmploymentForm setData={null} data={data.employment} disabled={true} />
            {ObjectToArray(data.otherEmploymentData).map((item, i) => {
              return <OtherEmploymentForm setData={null} data={item} disabled={true} key={i} />
            })}
            {ObjectToArray(data.previousEmploymentData).map((item, i) => {
              return <PreviousEmploymentForm setData={null} data={item} disabled={true} key={i} />
            })}
          </Modal.Body>
        </Modal>
      </>
    );
  }
  