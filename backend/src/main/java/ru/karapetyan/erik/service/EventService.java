package ru.karapetyan.erik.service;

import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import ru.karapetyan.erik.exception.NotFoundException;
import ru.karapetyan.erik.model.Event;
import ru.karapetyan.erik.repository.EventRepository;

/**
 * @author erik.karapetyan
 */
@Service
public class EventService {

    private final EventRepository repo;

    public EventService(EventRepository repo) {
        this.repo = repo;
    }

    public List<Event> findAll() {
        return repo.findAll();
    }

    public Event findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Event with id " + id + " not found"));
    }

    @Transactional
    public Event create(Event event) {
        return repo.save(event);
    }

    @Transactional
    public Event update(Long id, Event updated) {
        Event existing = findById(id);
        existing.setName(updated.getName());
        existing.setGame(updated.getGame());
        existing.setStartTime(updated.getStartTime());
        return repo.save(existing);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new NotFoundException("Event with id " + id + " not found");
        }
        repo.deleteById(id);
    }
}
