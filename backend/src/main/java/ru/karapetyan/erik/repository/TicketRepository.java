package ru.karapetyan.erik.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.karapetyan.erik.model.Ticket;

/**
 * @author erik.karapetyan
 */
@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
