package ru.karapetyan.erik.service;

import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import ru.karapetyan.erik.exception.NotFoundException;
import ru.karapetyan.erik.model.Event;
import ru.karapetyan.erik.model.Ticket;
import ru.karapetyan.erik.repository.EventRepository;
import ru.karapetyan.erik.repository.TicketRepository;

/**
 * @author erik.karapetyan
 */
@Service
public class TicketService {

    private final TicketRepository ticketRepo;
    private final EventRepository eventRepo;

    public TicketService(TicketRepository ticketRepo, EventRepository eventRepo) {
        this.ticketRepo = ticketRepo;
        this.eventRepo = eventRepo;
    }

    public List<Ticket> findAll() {
        return ticketRepo.findAll();
    }

    public Ticket findById(Long id) {
        return ticketRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Ticket with id " + id + " not found"));
    }

    /**
     * Покупка билетов
     */
    @Transactional
    public Ticket purchase(Long eventId, Double price, Integer quantity) {
        Event event = eventRepo.findById(eventId)
                .orElseThrow(() -> new NotFoundException("Event with id " + eventId + " not found"));
        Ticket ticket = new Ticket(event, price, quantity);
        return ticketRepo.save(ticket);
    }

    @Transactional
    public Ticket update(Long id, Ticket updated) {
        Ticket existing = findById(id);
        existing.setPrice(updated.getPrice());
        existing.setQuantity(updated.getQuantity());
        return ticketRepo.save(existing);
    }

    public void delete(Long id) {
        ticketRepo.deleteById(id);
    }
}
