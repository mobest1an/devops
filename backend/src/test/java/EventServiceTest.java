import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import ru.karapetyan.erik.exception.NotFoundException;
import ru.karapetyan.erik.model.Event;
import ru.karapetyan.erik.repository.EventRepository;
import ru.karapetyan.erik.service.EventService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * @author erik.karapetyan
 */
public class EventServiceTest {

    private EventRepository repo;
    private EventService service;

    @BeforeEach
    void setUp() {
        repo = mock(EventRepository.class);
        service = new EventService(repo);
    }

    @Test
    void findAll_returnsAll() {
        List<Event> list = List.of(
                new Event("Summer Cup", "CS:GO", LocalDateTime.now().plusDays(10)),
                new Event("Winter Clash", "Dota 2", LocalDateTime.now().plusMonths(1))
        );
        when(repo.findAll()).thenReturn(list);

        List<Event> result = service.findAll();
        assertEquals(2, result.size());
    }

    @Test
    void findById_exists() {
        Event ev = new Event("Champions", "LoL", LocalDateTime.now().plusDays(20));
        ev.setId(5L);
        when(repo.findById(5L)).thenReturn(Optional.of(ev));

        Event found = service.findById(5L);
        assertEquals("Champions", found.getName());
    }

    @Test
    void findById_notFound_throws() {
        when(repo.findById(99L)).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> service.findById(99L));
    }

    @Test
    void create_persists() {
        Event toSave = new Event("New Event", "Valorant", LocalDateTime.now().plusDays(5));
        when(repo.save(toSave)).thenAnswer(i -> {
            Event e = i.getArgument(0);
            e.setId(12L);
            return e;
        });

        Event saved = service.create(toSave);
        assertEquals(12L, saved.getId());
        verify(repo).save(toSave);
    }
}
