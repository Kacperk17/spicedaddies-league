'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Burger, Container, Group, Text, Title, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderSimple.module.css';
import NextImage from 'next/image';
import premLogo from '../app/images/prem-logo.png';

const links = [
  { link: '/league-standings', label: 'League Table' },
  { link: '/past-tables', label: 'Past Tables' },
  { link: "/spicedaddy-profiles", label: "Spicedaddy Profiles" }
];

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const pathname = usePathname();

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={pathname === link.link || undefined}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container fluid size="md" className={classes.inner}>
        <Group>
          <Image
            src={premLogo}
            h={50}
            w="auto"
            fit="contain"
            component={NextImage}
            alt="prem logo"
          />
          <Title order={3} c="#381b58">SpiceDaddies</Title>
        </Group>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
