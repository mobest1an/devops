package ru.karapetyan.erik.controller;

import java.util.List;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ru.karapetyan.erik.model.Ticket;
import ru.karapetyan.erik.service.TicketService;

/**
 * @author erik.karapetyan
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService service;

    public TicketController(TicketService service) {
        this.service = service;
    }

    @GetMapping
    public List<Ticket> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Ticket one(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping("/purchase")
    @ResponseStatus(HttpStatus.CREATED)
    public Ticket purchase(@RequestBody PurchaseRequest request) {
        return service.purchase(request.getEventId(),
                request.getPrice(),
                request.getQuantity());
    }

    @PutMapping("/{id}")
    public Ticket update(@PathVariable Long id, @RequestBody Ticket ticket) {
        return service.update(id, ticket);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    public static class PurchaseRequest {
        @NotNull
        private Long eventId;
        @NotNull
        private Double price;
        @NotNull
        @Min(1)
        private Integer quantity;

        public Long getEventId() {
            return eventId;
        }

        public void setEventId(Long eventId) {
            this.eventId = eventId;
        }

        public Double getPrice() {
            return price;
        }

        public void setPrice(Double price) {
            this.price = price;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }
    }
}
