import React from 'react'
import Image from 'next/image'
import { getCountryLogoUrl } from '@/lib/utils'

interface RenderLocationTagProps {
    country: string
    state: string
    city: string
}

const RenderLocationTag = async ({
  country,
  state,
  city,
}: RenderLocationTagProps) => {
  const flagUrl = await getCountryLogoUrl(country);
  const address = `${city ? `${city}, ` : ""} ${
    state ? `${state}, ` : ""
  } ${country}`;
  return (
    <div className="background-light800_dark400 flex items-center justify-end gap-2 rounded-2xl px-3 py-1.5">
      <Image
        src={flagUrl}
        alt="flag"
        width={16}
        height={16}
        className="rounded-full"
      />
      <p className="body-medium text-dark400_light700">{address}</p>
    </div>
  );
};

export default RenderLocationTag