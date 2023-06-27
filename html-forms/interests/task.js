// Получаем все элементы checkbox с классом interest__check
const checkboxes = document.querySelectorAll('.interest__check');

// Функция для обработки изменений состояния checkbox
function handleCheckboxChange(event) {
  const checkbox = event.target;
  const isChecked = checkbox.checked;

  // Вызываем функцию для обновления состояния checkbox и его дочерних элементов
  updateCheckboxState(checkbox, isChecked);
  updateParentCheckboxes(checkbox);
}

// Функция для обновления состояния checkbox и его дочерних элементов
function updateCheckboxState(checkbox, isChecked) {
  const nestedCheckboxes = checkbox.parentNode.nextElementSibling;

  // Если есть вложенные checkbox, обновляем их состояние
  if (nestedCheckboxes) {
    const nestedCheckboxList = nestedCheckboxes.querySelectorAll('.interest__check');
    nestedCheckboxList.forEach(nestedCheckbox => {
      nestedCheckbox.checked = isChecked;
      updateCheckboxState(nestedCheckbox, isChecked);
    });
  }
}

// Функция для обновления состояния родительских checkbox
function updateParentCheckboxes(checkbox) {
  let parentCheckbox = checkbox.closest('.interests').previousElementSibling.querySelector('.interest__check');

  // Пока есть родительский checkbox, обновляем его состояние
  while (parentCheckbox) {
    const siblingCheckboxes = parentCheckbox.closest('.interest').querySelectorAll('.interest__check');
    let allChecked = true;
    let allUnchecked = true;

    siblingCheckboxes.forEach(siblingCheckbox => {
      if (siblingCheckbox.checked) {
        allUnchecked = false;
      } else {
        allChecked = false;
      }
    });

    // Устанавливаем состояние родительского checkbox в зависимости от состояния дочерних checkbox
    if (allChecked) {
      parentCheckbox.checked = true;
      parentCheckbox.indeterminate = false;
    } else if (allUnchecked) {
      parentCheckbox.checked = false;
      parentCheckbox.indeterminate = false;
    } else {
      parentCheckbox.checked = false;
      parentCheckbox.indeterminate = true;
    }

    parentCheckbox = parentCheckbox.closest('.interests').previousElementSibling.querySelector('.interest__check');
  }
}

// Назначаем обработчик события изменения состояния checkbox
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', handleCheckboxChange);
});
