'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Burger, Container, Group, Text, Title, Image, Drawer, Stack } from '@mantine/core';
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
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={pathname === link.link || undefined}
      onClick={close} // Close the drawer when a link is clicked
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
        <Group gap={5} visibleFrom="sm">
          {items}
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size="sm" />

        <Drawer
          opened={opened}
          onClose={close}
          hiddenFrom="xs"
          zIndex={1000000}
        >
          <Stack mt={60} gap="md" p="md">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.link}
                className={classes.link}
                data-active={pathname === link.link || undefined}
                onClick={close}
              >
                {link.label}
              </Link>
            ))}
          </Stack>
        </Drawer>
      </Container>
    </header>
  );
}