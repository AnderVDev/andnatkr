package com.andnatkr.server.services.impl;

import com.andnatkr.server.domain.entities.EstateMgmt;
import com.andnatkr.server.repositories.EstateMgmtRepository;
import com.andnatkr.server.repositories.EstateRepository;
import com.andnatkr.server.services.EstateMgmtService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class EstateMgmtServiceImpl implements EstateMgmtService {
    public final EstateMgmtRepository mgmtRepository;
    public final EstateRepository estatesRepository;

    @Override
    public EstateMgmt save(EstateMgmt input) {

        return mgmtRepository.save(input);
    }

    @Override
    public List<EstateMgmt> findAll() {
        return StreamSupport.stream(
                mgmtRepository
                        .findAll()
                        .spliterator(),
                false
        ).collect(Collectors.toList());
    }

    @Override
    public Optional<EstateMgmt> findOne(Long id) {
        return mgmtRepository.findById(id);
    }

    @Override
    public boolean isExists(Long id) {
        return mgmtRepository.existsById(id);
    }

    @Override
    public EstateMgmt partialUpdated(Long id, EstateMgmt inputEntity) {
        inputEntity.setId(id);
        return mgmtRepository.findById(id).map(existingInput -> {
            Optional.ofNullable(inputEntity.getUser()).ifPresent(existingInput::setUser);
            Optional.ofNullable(inputEntity.getFinanceStatement()).ifPresent(existingInput::setFinanceStatement);
            Optional.ofNullable(inputEntity.getEstate()).ifPresent(existingInput::setEstate);
            Optional.ofNullable(inputEntity.getAmount()).ifPresent(existingInput::setAmount);
            Optional.ofNullable(inputEntity.getMonth()).ifPresent(existingInput::setMonth);
            Optional.ofNullable(inputEntity.getYear()).ifPresent(existingInput::setYear);
            Optional.ofNullable(inputEntity.getDetail()).ifPresent(existingInput::setDetail);
            Optional.ofNullable(inputEntity.getComments()).ifPresent(existingInput::setComments);
            return mgmtRepository.save(existingInput);
        }).orElseThrow(() -> new RuntimeException("Input Does not Exist"));
    }

    @Override
    public void delete(Long id) {
        mgmtRepository.deleteById(id);
    }

}
