"use client";

import { Container } from "@/components/UI";
import { PlayerMenu } from "@/components/playerDashboard";
import useAuth from "@/helpers/useAuth";

export default function DashboardLayout({ children }) {
  const { isLoggedIn, logout } = useAuth(); // Destructure isLoggedIn and logout from useAuth()

  return (
    <section>
      <Container>
        {isLoggedIn && <PlayerMenu />}
        {children}
      </Container>
    </section>
  );
}
