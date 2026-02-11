package com.example.dcuniverse.controllers;

import com.example.dcuniverse.model.Characters;
import com.example.dcuniverse.model.Powerstats;
import com.example.dcuniverse.security.JwtUtil;
import com.example.dcuniverse.security.UserService;
import com.example.dcuniverse.service.CharacterService;
import com.example.dcuniverse.service.PowerStatsService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import lombok.extern.log4j.Log4j2;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;

@RestController
@Log4j2
@AllArgsConstructor
@RequestMapping("/api")
@SuppressWarnings({"java:S5738", "java:S4684"})
public class DCUniverseController {
    CharacterService characterService;
    PowerStatsService powerStatsService;

    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;
    private UserDetailsService userDetailsService;
    private UserService userService;

    /** INFORMACION PARA EL DESARROLLADOR DEL FRONT

     * Ruta para Swagger
        http://localhost:8080/swagger-ui/index.html#

     * Para el login tenemos dos usuarios
    username:  "user"
    password: "password"
    Tiene el rol de USER

    El otro usuario es:
    username:  "wayne"
    password: "soybatman"
    Tiene el rol de ADMIN
    */

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        log.debug("A request has arrived to login");
        
        try{
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
            // Validar la contraseña
            if (userService.validatePassword(request.getPassword(), userDetails.getPassword())) {
                return ResponseEntity.ok(new LoginResponse(jwtUtil.generateToken(userDetails.getUsername())));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario o contraseña incorrectos");
            }
        }catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no encontrado");
        }
    }

    @GetMapping(value = "/characters")
    public ResponseEntity<Page<Characters>> getCharacters2(
            @RequestParam(name= "page", defaultValue = "0") int page,
            @RequestParam(name= "size", defaultValue = "100") int size
    ) {
        log.debug("A request has arrived to get all characters");
        return ResponseEntity.ok(characterService.obtenerCharacters(page, size));
    }

    @PostMapping("/characters")
    public Characters createCharacter(@RequestBody Characters character) {
        log.debug("A request has arrived to create a character");
        return characterService.save(character);
    }

    @PutMapping("/characters")
    public Characters updateCharacter(@RequestBody Characters character) {
        log.debug("A request has arrived to update a character");
        return characterService.save(character);
    }

    @GetMapping(value = "/characters/{id}")
    public ResponseEntity<Characters> getCharacterById(@PathVariable("id") Long id) {
        log.debug("A request has arrived to get character by id: {} ", id);
        Optional<Characters> characterOptional = characterService.findById(id);

        // Verificar si el personaje está presente
        if (characterOptional.isPresent()) {
            return ResponseEntity.ok(characterOptional.get()); // Devolver el personaje encontrado con estado 200 OK
        } else {
            log.error("Character with id {} not found", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Devolver 404 si no se encuentra el personaje
        }
    }

    @GetMapping(value = "/characters/name/{heroName}")
    public ResponseEntity<List<Characters>> getCharacterById(@PathVariable String heroName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size) {
        log.debug("A request has arrived to get character by heroName: {} ", heroName);
        List<Characters> charactersList = characterService.findByHeronameContains(heroName, PageRequest.of(page, size));

        // Verificar si el personaje está presente
        if (!charactersList.isEmpty()) {
            return ResponseEntity.ok(charactersList); // Devolver el personaje encontrado con estado 200 OK
        } else {
            log.error("Character with heroName {} not found", heroName);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Devolver 404 si no se encuentra el personaje
        }
    }

    @DeleteMapping("/characters/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCharacter(@PathVariable("id") Long id) {
        log.info("A request has been received to delete the character with id {}", id);
        characterService.deleteById(id);
    }

    @GetMapping("/powerstats/power/{value}")
    public ResponseEntity<List<Powerstats>> getPowerGreaterThan(@PathVariable("value") Double value,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size) {
        log.info("A request has been received to get power greater than value {}", value);
        return ResponseEntity.ok(powerStatsService.findByPowerGreaterThan(value, PageRequest.of(page, size)));
    }

    @GetMapping("/characters/power/{value}")
    public ResponseEntity<List<Characters>> getCharactersPowerGreaterThan(@PathVariable("value") Double value,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size) {
        log.info("A request has been received to get characters with power greater than value {}", value);
        return ResponseEntity.ok(characterService.findByPowerGreaterThan(value,PageRequest.of(page, size)));
    }

}
