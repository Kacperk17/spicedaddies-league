'use client';

import { Select } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GwSelector({ currentGw }: { currentGw: number }) {
    const router = useRouter();
    const [value, setValue] = useState(String(currentGw));

    // Update router when dropdown value changes
    useEffect(() => {
        if (value) {
            router.replace(`/?gw=${value}`);
        }
    }, [value, router]);

    const gwOptions = Array.from({ length: 35 }, (_, i) => ({
        value: String(i + 1),
        label: `${i + 1}`,
    }));

    return (
        <Select
            label='GW'
            data={gwOptions}
            value={value}
            onChange={(val) => setValue(val!)}
            maxDropdownHeight={200}
        />
    );
}
