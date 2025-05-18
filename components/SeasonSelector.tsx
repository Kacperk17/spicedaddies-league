'use client'

import { Select } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { seasonOptions } from '@/utils/getHistoricSpicedaddies';

export default function SeasonSelector() {
    const router = useRouter();
    const [value, setValue] = useState("2023/24");

    // Update router when dropdown value changes
    useEffect(() => {
        if (value) {
            router.replace(`past-tables/?season=${value}`);
        }
    }, [value, router]);

    return (
        <Select
            label='Season'
            data={seasonOptions}
            value={value}
            onChange={(val) => setValue(val!)}
            maxDropdownHeight={200}
        />
    );
}