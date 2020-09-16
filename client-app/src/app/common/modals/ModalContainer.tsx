import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Modal } from 'semantic-ui-react';
import { RootStoreContext } from '../../stores/rootStore';

const ModalContainer = () => {
    const rootStore = useContext(RootStoreContext);
    const {modal: {open, body}, closeModal} = rootStore.modalStore;
    return (
        //use open from modalStore to set the open property in Modal to true or false
      <Modal open={open} onClose={closeModal} size='mini'>
          <Modal.Content>
            {body}
          </Modal.Content>
      </Modal>
    );
}

export default observer(ModalContainer);