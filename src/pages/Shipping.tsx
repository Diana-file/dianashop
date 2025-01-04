import React from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { ShippingInfo } from '../components/shipping/ShippingInfo';
import { DeliveryMap } from '../components/shipping/DeliveryMap';

export const Shipping = () => {
  return (
    <div className="pt-20">
      <PageHeader title="Informazioni sulla Spedizione" />
      <div className="container mx-auto px-4 py-16">
        <ShippingInfo />
        <DeliveryMap />
      </div>
    </div>
  );
};