import { useAppSelector } from "@app/store/hooks";

import { Progress, Typography } from "@shared/ui";

import { steps } from "../constants/steps";
import { useCreateOrder } from "../model/useCreateOrder";
import { getCreateOrderState } from "../store";
import { ESteps } from "../store/type";
import { AddressForm, DeliverMethodForm, DeliveryPaymentForm, RecieverSenderForm } from "./forms";

export const FormStepManager = () => {
  const {
    currentStep,
    createOrder: { sender, receiver, receiverAddress, senderAddress }
  } = useAppSelector(getCreateOrderState);
  const { setReceiver, setSender, setReceiverAddress, setSenderAddress } = useCreateOrder();

  const stepComponents: Record<ESteps, React.JSX.Element> = {
    [ESteps.DELIVERY_METHOD]: <DeliverMethodForm />,
    [ESteps.RECEIVER]: (
      <RecieverSenderForm key={ESteps.RECEIVER} handleSubmit={setReceiver} contact={receiver} />
    ),
    [ESteps.SENDER]: (
      <RecieverSenderForm key={ESteps.SENDER} handleSubmit={setSender} contact={sender} />
    ),
    [ESteps.PICKUP_LOCATION]: (
      <AddressForm
        key={ESteps.PICKUP_LOCATION}
        handleSubmit={setReceiverAddress}
        address={receiverAddress}
      />
    ),
    [ESteps.DELIVERY_LOCATION]: (
      <AddressForm
        key={ESteps.DELIVERY_LOCATION}
        handleSubmit={setSenderAddress}
        address={senderAddress}
      />
    ),
    [ESteps.PAYMENT]: <DeliveryPaymentForm />,
    [ESteps.ORDER_REVIEW]: <div className=''>7</div>
  };

  return (
    <>
      <Typography tag='h2' variant='title_h2'>
        {currentStep}
      </Typography>
      <div className='space-y-2'>
        <Typography variant='paragraph12_regular'>{`Шаг ${steps.indexOf(currentStep) + 1} из 7`}</Typography>
        <Progress value={Math.ceil(((steps.indexOf(currentStep) + 1) / 7) * 100)} />
      </div>
      {stepComponents[currentStep]}
    </>
  );
};
