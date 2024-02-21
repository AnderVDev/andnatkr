package com.andnatkr.server.services;

import com.andnatkr.server.domain.entities.User;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;
import java.util.Objects;
import java.util.function.Function;

public interface JwtService {
    String extractUsername(String token);

    <T> T extractClaim(String token, Function<Claims, T> claimsResolver);

    String generateToken(UserDetails userDetails);

    String generateToken(Map<String, Objects> extraClaims, UserDetails userDetails);

    String generateRefreshToken( UserDetails userDetails);

    boolean isTokenValid(String token, UserDetails userDetails);

}

